
# Ejercicios Apigateway [Node + Express]

En esta práctica se utilizó:
- Logger con Winston para el registro de logs.
- Circuit Breaker en servicios.
- RateLimit
- Cache con Node-Cache

**api-gateway:** Contiene el backend principal o enrutador (Cors habilitado *).

**user-service:** Microservicio básico que envia una REST con un array de usuarios.

**products-service:** Microservicio básico que envia una REST con un array de productos.

**grpc-service:** Microservicio que notifcación un mensaje por medio de comunicación gRPC

**demo-service:** Microservicio que envia un mensaje de ejemplo al front.



En cada carpeta debe correr el comando:

1. Instalación de depencias:

```bash
  npm install
```

luego:

```bash
  npm start
```

2. URLS donde estarán corriendo los servicios:


**api-gateway:** 
```bash
  http://localhost:3000
```

**user-service:** 
```bash
  http://localhost:5001
```

**products-service:** 
```bash
  http://localhost:5002
```

**grpc-service:** 
```bash
  http://localhost:5003
```

**demo-service:** 
```bash
  http://localhost:5004
```

## Servicios Expuestos:

```http
USERS | GET http://localhost:3000/api/users

#
  output: [
	{
		"id": 1,
		"name": "John Doe 1"
	},
	{
		"id": 2,
		"name": "John Doe 2"
	}
]
```

```http
  PRODUCTS | GET http://localhost:3000/api/products
  #
  output: [
	{
		"id": 101,
		"name": "Laptop"
	} 
]
```

```http
  GRPC | GET http://localhost:3000/api/gprc
    #
  output: {
	"message": "Respuesta desde gRP"
    }
```

```http
  DEMO | GET http://localhost:3000/api/demo
  #
  output: {
	"message": "Demo services from Microservices Architecture"
    }
```



## Authors

- [@lewisfnoguera](https://www.github.com/lewisfnoguera)

