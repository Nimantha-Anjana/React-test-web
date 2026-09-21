// Generic CRUD handlers, reused by the simple resources (rooms, gallery, services ...).
// Each resource controller just calls crudController(Model, options).

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Only keep fields that exist in the schema (stops users writing arbitrary fields)
const pickFields = (Model, body) => {
  const data = {};
  for (const key of Object.keys(body || {})) {
    if (Model.schema.path(key) && !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)) {
      data[key] = body[key];
    }
  }
  return data;
};

// Simple equality filters from the query string: /api/gallery?status=Published&category=Dining
// Only plain string values for real schema fields are allowed (blocks NoSQL operator injection like ?status[$ne]=x).
const buildFilter = (Model, query) => {
  const filter = {};
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string' && Model.schema.path(key)) filter[key] = value;
  }
  return filter;
};

export const crudController = (Model, { sort = { createdAt: -1 } } = {}) => ({
  getAll: asyncHandler(async (req, res) => {
    const items = await Model.find(buildFilter(Model, req.query)).sort(sort);
    res.json(items);
  }),

  getOne: asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  }),

  create: asyncHandler(async (req, res) => {
    const item = await Model.create(pickFields(Model, req.body));
    res.status(201).json(item);
  }),

  update: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, pickFields(Model, req.body), {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  }),
});

export { asyncHandler };
