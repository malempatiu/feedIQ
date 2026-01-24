import pytest
from httpx import AsyncClient


class TestFeedsIntegration:
    @pytest.mark.asyncio
    async def test_create_feedback_flow(self, client: AsyncClient, mock_repo):
        response = await client.post(
            "/api/v1/feeds/",
            json={
                "title": "Add tags for solutions",
                "detail": "Easier to search for solutions based on a specific stack.",
            }
        )

        print(response.json())

        assert response.status_code == 201
        assert response.headers["content-type"] == "application/json"
        data = response.json()
        assert data["id"] == 1
        assert data["title"] == "Add tags for solutions"
        assert data["detail"] == "Easier to search for solutions based on a specific stack."
        assert data["category"] is None
        assert data["priority"] is None
        assert "createdAt" in data

        assert len(mock_repo.feedbacks) == 1
        stored_feedback = mock_repo.feedbacks[1]
        assert stored_feedback.title == "Add tags for solutions"
