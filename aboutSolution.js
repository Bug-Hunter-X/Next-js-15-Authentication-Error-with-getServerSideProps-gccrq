```javascript
// pages/aboutSolution.js
import { getSession } from 'next-auth/react';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      {/* User data will be available here after successful authentication */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Fetch user data based on the session
  const user = await fetchUserData(session.accessToken);

  return {
    props: {
      user: user,
    },
  };
}

async function fetchUserData(token) {
  const res = await fetch('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}
```