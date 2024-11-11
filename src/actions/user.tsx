'use server';

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      console.error('User not authenticated');
      return { status: 403, message: 'User not authenticated' };
    }

    console.log('Authenticated user:', user);

    // Check if the user exists in the database
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: true,
      },
    });

    if (userExist) {
      console.log('User exists:', userExist);
      return { status: 200, user: userExist };
    }

    // Create a new user if they don't exist
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses?.[0]?.emailAddress || '',
        firstname: user.firstName || '',
        lastname: user.lastName || '',
        image: user.imageUrl || '',
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName || 'User'}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) {
      console.log('New user created:', newUser);
      return { status: 201, user: newUser };
    }

    console.error('Failed to create user');
    return { status: 400, message: 'Failed to create user' };
  } catch (error) {
    console.error('🔴 ERROR', error);
    return { status: 500, message: error || 'An error occurred' };
  }
};
