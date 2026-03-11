import json
import logging
from typing import Any

from confluent_kafka.aio import AIOProducer
from confluent_kafka import KafkaException


logger = logging.getLogger(__name__)


def on_error(error: KafkaException) -> None:
    """Route fatal librdkafka errors into Python logging instead of stderr."""
    logger.error(f"Kafka producer error: {error}")


def build_config() -> dict:
    config = {
        "bootstrap.servers": 'kafka:29092',
        "acks": "all",
        "retries": 3,
        "retry.backoff.ms": 300,
        "logger": logger,
        "error_cb": on_error,
    }
    return config


class ProducerNotStartedError(Exception):
    """Raised when produce() is called before start()."""


class MessageSerializationError(Exception):
    """Raised when the message value cannot be serialized to JSON."""


class DeliveryError(Exception):
    """Raised when the broker fails to acknowledge the message."""


class BrokerUnavailableError(Exception):
    """Raised when the broker cannot be reached on startup."""


class KafkaProducer:
    def __init__(self):
        self._producer: AIOProducer | None = None

    async def start(self) -> None:
        try:
            self._producer = AIOProducer(build_config())
        except KafkaException as e:
            raise RuntimeError(
                f"Could not initialise Kafka producer: {e}") from e
        logger.info("AIOProducer started and broker reachable")

    async def stop(self) -> None:
        if not self._producer:
            return
        try:
            await self._producer.flush()
            logger.info("AIOProducer flushed")
        except KafkaException:
            logger.exception(
                "Error while flushing — some messages may be lost")
        finally:
            await self._producer.close()
            logger.info("AIOProducer closed")

    async def produce(
        self,
        topic: str,
        value: Any,
    ) -> None:
        if not self._producer:
            logger.info("Producer not initialized, starting now...")
            await self.start()
        
        assert self._producer is not None, "Producer should be initialized at this point"

        try:
            payload = json.dumps(value).encode("utf-8")
        except (TypeError, ValueError) as e:
            raise MessageSerializationError(
                f"Cannot serialize message value to JSON: {e}"
            ) from e

        try:
            delivery_future = await self._producer.produce(
                topic, value=payload, 
            )
            msg = await delivery_future
        except KafkaException as e:
            logger.error(f"Delivery failed — topic='{topic}': {e}")
            raise DeliveryError(
                f"Failed to deliver message to topic '{topic}': {e}"
            ) from e

        logger.info(
            f"Delivered → topic={msg.topic()} "
            f"partition={msg.partition()} offset={msg.offset()}"
        )


producer = KafkaProducer()
