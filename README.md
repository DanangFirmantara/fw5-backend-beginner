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

## users

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

## History

| Method     | API              | Remark                                                         |
| ---------- | ---------------- | -------------------------------------------------------------- |
| **GET**    | /history         | get list data all history                                      |
| **GET**    | /history/user    | get list data history user                                     |
| **POST**   | /history         | add history to order vehicle                                   |
| **DELETE** | /history?id=     | delete history by history id                                   |
| **PATCH**  | /history?id=     | update data history. this endpoint only use for return vehicle |
| **PATCH**  | /history/payment | update data isPayment from 0 to 1 in table histories           |
