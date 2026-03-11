from enum import Enum


class KafkaTopic(str, Enum):
    FEEDBACKS = "feedbacks"
