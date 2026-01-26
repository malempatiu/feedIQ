import pytest
from httpx import AsyncClient

path = "/api/v1/feeds/"

def assert_field_error(field, errors):
    return any(
        field.lower() in str(err).lower() for err in errors
    )

class TestFeedsIntegration:
    @pytest.mark.asyncio
    async def test_create_request_input(self, client: AsyncClient, mock_repo):
        dto = {
            'title': 'Hi',
            'detail': 'Not long enough'
        }

        response = await client.post(path, json=dto)

        assert response.status_code == 422
        errors = response.json()['detail']
        assert assert_field_error('title', errors)
        assert assert_field_error('detail', errors)
        
    @pytest.mark.asyncio
    async def test_create_feedback_flow(self, client: AsyncClient, mock_repo):
        dto = {
            "title": "Add tags for solutions",
            "detail": "Easier to search for solutions based on a specific stack."
        }
        response = await client.post(path, json=dto)

        assert response.status_code == 201
        assert response.headers["content-type"] == "application/json"
        data = response.json()
        assert data["id"] == 1
        assert data["title"] == dto["title"]
        assert data["detail"] == dto["detail"]
        assert data["category"] is None
        assert data["priority"] is None
        assert "createdAt" in data

        assert len(mock_repo.feedbacks) == 1
        stored_feedback = mock_repo.feedbacks[1]
        assert stored_feedback.title == dto["title"]
