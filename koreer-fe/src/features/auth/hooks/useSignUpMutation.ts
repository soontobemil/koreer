import { UserPostDTO } from "../../../types/signup";

interface Args {
  id: string;
  nickName: string;
  password: string;
  nation: string;
}

export const useSignUpMutation = async (data: Args): Promise<void> => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: data.id,
        username: data.nickName,
        password: data.password,
        nation: data.nation,
      } as UserPostDTO),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }
  } catch (error) {
    throw error;
  }
};
