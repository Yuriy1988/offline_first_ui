const schema = {
  'title': 'form data',
  'description': 'simple data',
  'version': 0,
  'type': 'object',
  'properties': {
    id: {
      type: 'string',
      primary: true,
    },
    markedForDeletion: {
      type: 'boolean',
    },
    isSynced: {
      'type': 'boolean',
    },
    key: {
      'type': 'string',
    },
    value: {
      'type': 'string',
    },
  },
  'required': ['id'],
};

export default schema;
