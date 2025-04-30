export async function getUserProfile(userId: string) {
  try {
    const response = await fetch(`/api/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user profile");
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
}

export async function updateUserProfile(data) {
  try {
    const response = await fetch(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
}
