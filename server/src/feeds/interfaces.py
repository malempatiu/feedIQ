from abc import ABC, abstractmethod
from typing import List
from .dtos import FeedbackCreateDTO
from .model import Feedback

class IFeedsRepository(ABC):
    """Interface for Feedback repository operations"""

    @abstractmethod
    async def create(self, feedback: FeedbackCreateDTO) -> Feedback:
        """Create a new feedback"""
        pass

    @abstractmethod
    async def get_by_id(self, feedback_id: int) -> Feedback | None:
        """Get feedback by ID"""
        pass

    @abstractmethod
    async def get_all(self, offset:int, limit: int) -> List[Feedback]:
        """Get all feedback"""
        pass

    @abstractmethod
    async def update(self, feedback: FeedbackCreateDTO) -> Feedback | None:
        """Update a feedback"""
        pass

    @abstractmethod
    async def delete(self, id: int) -> bool:
        """Delete a feedback"""
        pass

    @abstractmethod
    async def get_total(self) -> int:
        """Get total number of rows"""
        pass