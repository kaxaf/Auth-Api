async function test() {
  try {
    const loginRes = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'admin@gmail.com', 
        password: 'admin123' 
      })
    });

    const loginData = await loginRes.json();
    console.log('LOGIN:', loginData);

    if (!loginData.access_token) {
      console.log('Login failed, error:', loginData.error);
      return;
    }

    const profileRes = await fetch('http://localhost:3000/api/profile', {
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer ' + loginData.access_token 
      }
    });

    const profileData = await profileRes.json();
    console.log('RESULT:', profileData);

    const adminRes = await fetch('http://localhost:3000/api/admin', {
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer ' + loginData.access_token 
      }
    });

    const adminData = await adminRes.json();
    console.log('ADMIN RESULT:', adminData);

  } catch (err) {
    console.log('Error:', err.message);
  }
}

test();