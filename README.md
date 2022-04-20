# Vehicle Rent API

Vehicle rent API is a RESTful based on vehicle rent app. You will access data about user, vehicle and other. This API you can simulate how to reservation some vehicle in this API.

# Getting Started

```sh
git clone https://github.com/DanangFirmantara/vehicle-rent-api.git cd vehicle-rent-api
```

```sh
npm i
```

```sh
npm run dev
```

for development in local. you can import **vehicle_rent.sql** in your phpmyadmin
for documentation in postman you can import **VEHICLE-RENT-PROJECT.postman_collection.json**

# Endpoint

## Vehicle Endpoint

| Method     | API           | Remark                       |
| ---------- | ------------- | ---------------------------- |
| **GET**    | /Vehicles     | get data from vehicles table |
| **DELETE** | /vehicles?id= | delete data vehicle by id    |
| **INSERT** | /vehicles     | input data to table vehicles |
| **PATCH**  | /vehicls?id=  | update data vehicles by id   |

### Query params and body vehicle endpoint

- filter vehicles data `GET`

| Key        | Remark   | Description                                                        |
| ---------- | -------- | ------------------------------------------------------------------ |
| name       | `string` | find by vehicle name                                               |
| id         | `number` | find by id vehicle                                                 |
| idLocation | `number` | find by idLocation                                                 |
| page       | `number` | get list vehicle by page, default 1                                |
| limit      | `number` | set limit to results, default 4                                    |
| orderBy    | `string` | order result by column in table vehicles, example orderBy=category |
| sortType   | `string` | sort data to results, default ASC, available value **ASC, DESC**   |

- body in vehicle data `POST`, use Content-Type : multipart/form-data. in postman you can set in body and choose form-data. if you set stock 0 so in database it will set status **full booked**, otherwise it will set **Available**

| Key         | Remark   | Description                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------- |
| image       | `file`   | browse your image, `required` max : 2 mb, fileType: jpeg, png, gif, tiff, svg+xml |
| name        | `string` | input name vehicle                                                                |
| idLocation  | `number` | input id location , example 1: yogyakarta, 2:Jakarta, 3:Padang                    |
| description | `string` | input description                                                                 |
| price       | `number` | input price vehicle /day                                                          |
| stock       | `number` | input stock vehicle                                                               |
| idCategory  | `number` | input idCategory, example 1: car, 2: motorbike, 3: bike                           |

- body in vehicle data `PATCH`, the body in vehicle `PATCH` is same with vehicle `POST` but in this endpoint you can set body only what you need.

## Users Endpoint

| Method     | API        | Remark                                                      |
| ---------- | ---------- | ----------------------------------------------------------- |
| **GET**    | /users     | get list data users                                         |
| **POST**   | /users     | registered users, default user register role is User        |
| **DELETE** | /users?id= | delete user by id                                           |
| **PATCH**  | /users     | update data user but you can't update username and password |

### Query params users endpoint

- filter users data `GET`

| Key      | Remark   | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| username | `string` | find by username                                                 |
| id       | `number` | find by id vehicle                                               |
| page     | `number` | get list vehicle by page, default 1                              |
| limit    | `number` | set limit to results, default 4                                  |
| orderBy  | `string` | order result by column in table vehicles, default by id          |
| sortType | `string` | sort data to results, default ASC, available value **ASC, DESC** |

- body in users data `POST`. use x-www-urlencoded in postman.

| Key      | Remark   | Description                                 |
| -------- | -------- | ------------------------------------------- |
| username | `string` | input username to table users               |
| contact  | `string` | input contact to table users. max length 16 |
| email    | `string` | input email to table users                  |
| password | `string` | input password to table users               |

- body in users data `PATCH`. use form-data in postman or set headers with Content-Type : multipart/form-data. this only update data user except username and password.

| Key         | Remark   | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| email       | `string` | update email user                                                          |
| image       | `file`   | browse your file in local. max : 2 mb, filetype : png, tiff, svg+xml, jpeg |
| address     | `string` | input address user                                                         |
| contact     | `string` | input contact user                                                         |
| displayName | `string` | input display name                                                         |
| birthDate   | `date`   | input birth date, format yyyy-mm-dd                                        |

## History Endpoint

| Method     | API              | Remark                                                         |
| ---------- | ---------------- | -------------------------------------------------------------- |
| **GET**    | /history         | get list data all history                                      |
| **GET**    | /history/user    | get list data history user                                     |
| **POST**   | /history         | add history to order vehicle                                   |
| **DELETE** | /history?id=     | delete history by history id                                   |
| **PATCH**  | /history?id=     | update data history. this endpoint only use for return vehicle |
| **PATCH**  | /history/payment | update data isPayment from 0 to 1 in table histories           |

### Query params and body history endpoint

filter history data `GET`

| Key      | Remark   | Description                                                          |
| -------- | -------- | -------------------------------------------------------------------- |
| page     | `number` | set page to result, default page = 1                                 |
| limit    | `number` | set max limit to result, default limit = 5                           |
| sortType | `string` | sort data by ASC or DESC. default sortType = ASC                     |
| orderBy  | `string` | order data to result by column in table histories,default orderBy=id |

body history data `POST`

| Key           | Remark   | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| rentStartDate | `date`   | input start date vehicle to booked , format yyyy-mm-dd |
| rentEndDate   | `date`   | input end date vehicle to booked , format yyyy-mm-dd   |
| vehicleId     | `number` | input vehicle id.                                      |
| quantity      | `number` | input number of vehicle to rent                        |
| idReservation | `number` | input id reservation                                   |

body history data `PATCH`. this end point only use to return vehicle. quantity should be input how many vehicle in user after user return. example user will return all vehicle so it should be input **quantity=0**.

| Key      | Remark   | Description           |
| -------- | -------- | --------------------- |
| quantity | `number` | update data quantity. |

body history Finish payment `PATCH`.

| Key         | Remark   | Description            |
| ----------- | -------- | ---------------------- |
| id          | `number` | set id user            |
| total       | `number` | number user should pay |
| codePayment | `number` | input code payment     |

## Profile User Endpoint

| Method  | API       | Remark                               |
| ------- | --------- | ------------------------------------ |
| **GET** | /profiles | get data profile user based on token |

## List View Endpoint

| Method  | API             | Remark                                             |
| ------- | --------------- | -------------------------------------------------- |
| **GET** | /list?filterBy= | get data filterby `1:car`, `2:motorbike`, `3:bike` |

## AUTH Endpoint

| Method   | API                 | Remark                           |
| -------- | ------------------- | -------------------------------- |
| **POST** | /auth/login         | Login user. it will return token |
| **POST** | /auth/verify        | check is user verify             |
| **POST** | /auth/forgotRequest | reset password user              |

### Body history endpoint

login endpoint `POST`

| Key      | Remark   | Description    |
| -------- | -------- | -------------- |
| username | `string` | input username |
| password | `string` | input password |

forgot request `POST`. to use this endpoint the flow is. first you can fill only email. then in email you will get code otp. after that you should fill email,code, password, confirm password to reset your password

| Key             | Remark   | Description                  |
| --------------- | -------- | ---------------------------- |
| email           | `string` | input email                  |
| code            | `number` | input code OTP has been sent |
| password        | `string` | input password               |
| confirmPassword | `string` | input confirm password       |

## Reservation Endpoint

| Method   | API          | Remark             |
| -------- | ------------ | ------------------ |
| **POST** | /reservation | create reservation |

### Body reservation endpoint

| Key      | Remark   | Description                                                                              |
| -------- | -------- | ---------------------------------------------------------------------------------------- |
| idCard   | `number` | input your idcard to table reservation                                                   |
| name     | `string` | input name to table reservation                                                          |
| lastName | `string` | input lastName to table reservation                                                      |
| contact  | `string` | input contact to table reservation                                                       |
| email    | `string` | input email to table reservation                                                         |
| payment  | `enum`   | input payment to table reservation. 1: prepayment, 2: paymeny at end, 3: partial payment |

## Category Endpoint

| Method  | API       | Remark            |
| ------- | --------- | ----------------- |
| **GET** | /category | get list category |

## Location Endpoint

| Method  | API       | Remark            |
| ------- | --------- | ----------------- |
| **GET** | /location | get list location |

# Standard response by Postman

```sh
{
   'success' : true,
   'message' : 'message',
   'pageInfo' : Object,
   'results' : [Object],

}
```

# Backend deploy with heroku

[https://fw5-backend-beginnner.herokuapp.com](https://fw5-backend-beginnner.herokuapp.com)

# Author

[Danang Firmantara](https://github.com/DanangFirmantara)
