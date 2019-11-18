# Pic Metric 1 Backend API

## Hosted on Heroku
        Heroku URL: https://pic-metric.herokuapp.com/

## Documentation

### Register User
Method: Post
https://pic-metric.herokuapp.com/api/auth/register/
                
                Request:
                {
                        "username":"demo",
                        "password":"password" 
                }

                Response:
                {
                        "id":1,
                        "username":"demo"
                }

### Login User
Method: Post
https://pic-metric.herokuapp.com/api/auth/login/
                
                Request:
                {
                        "username":"demo",
                        "password":"password" 
                }

                Response:
                {
                        "id":1,
                        "username":"demo"
                }

### Logout User
Method: Get
https://pic-metric.herokuapp.com/api/auth/logout/

                Response:
                {
                        "message": "Logged out successfully."
                }