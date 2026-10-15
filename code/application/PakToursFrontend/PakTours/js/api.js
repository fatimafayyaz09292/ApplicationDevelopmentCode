
// Sign Up Api Call
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const destination = document.getElementById('destination').value;

        if (!name || !email || !password || !destination) {
            alert("All fields are required, including a destination!");
            return;
        }

        const payload = { name, email, password, destination };

        try {
            const response = await fetch('http://localhost:8000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Signup successful! Welcome, " + result.name);
            } else {
                const error = await response.json();
                alert("Signup failed: " + (error.message || "Unknown error"));
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred: " + error.message);
        }
    });
});


// Login
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.querySelector('.login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        const payload = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("object results", result)
                localStorage.setItem('authToken', result.token);
                console.log("object --- result token", result.token)
                alert("Login successful! Welcome, ");
            } else {
                const error = await response.json();
                alert("Login failed: " + (error.message || "Unknown error"));
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    });
});

// Create Booking
// Function to decode a JWT token (Base64 URL decoding)
function decodeJWT(token) {
    const base64Url = token.split('.')[1];  
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Booking form
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('No authentication token found. Please log in.');
        return;
    }

    try {
        const decodedToken = decodeJWT(token);
        const userId = decodedToken.userId;
        const packageType = document.getElementById('packageType').value;
        const destination = document.getElementById('destination').value;
        const departureDate = document.getElementById('departDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const dailyBudget = document.getElementById('dailyBudget').value;
        const bookingAmount = document.getElementById('bookingAmount').value;
        const serviceFees = document.getElementById('serviceFees').value;

        const payload = {
            packag: packageType === "basic" ? "Basic Travel Package" : packageType === "premium" ? "Premium Travel Package" : "Luxury Travel Package",
            destination: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            dailyBudget: dailyBudget,
            initialBookingAmount: bookingAmount,
            serviceFees: serviceFees,
            userId: userId 
        };

        fetch('http://localhost:8000/api/v1/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Booking successful:', data);

            window.location.href = 'service.html';

            alert('Your booking has been successfully submitted!');
        })
        .catch(error => {
            console.error('Error during booking:', error);
            alert('There was an error with your booking submission. Please try again.');
        });

    } catch (error) {
        console.error('Error decoding token:', error);
        alert('Invalid token or token structure. Please log in again.');
    }
});

