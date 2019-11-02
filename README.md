### To run development server:

```
npm run dev
```

Go to [localhost:5000](http://localhost:5000)

### To run "database" server:

```
npm run json:server
```

Go to [localhost:3000](http://localhost:3000)

There are 2 available endpoints:

/index
/search

## Testing

You can run POST, PUT, PATCH or DELETE requests on Postman. The requests would look like:

GET /index/{id}
POST /index
PUT /index/{id}
PATCH /index/{id}
DELETE /index/{id}

GET /search

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically saved to db.json. A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.
