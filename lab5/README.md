
# My Zoo — Node.js + Express (REST CRUD)

Як запустити:
```bash
npm i
npm run dev
# відкрити http://localhost:3000
```

## API
- `GET /api/animals?search=&sort=expensive`
- `GET /api/animals/:id`
- `POST /api/animals` JSON: `{ title, description, expense, type }`
- `PUT /api/animals/:id`
- `DELETE /api/animals/:id`

Дані зберігаються у `db/animals.json`.
