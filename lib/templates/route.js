module.exports = `module.exports = [{
  path: '/{{model}}/',
  method: 'get',
  handler: get{{ modelCap }},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Find an existing {{modelCap}} based on id'
    }
  }
}
  }, {
  path: '/{{model}}/',
  method: 'post',
  handler: create{{ modelCap }},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Creates a new {{modelCap}}'
    }
  }
}
  }, {
  path: '/{{model}}/:id',
  method: 'delete',
  handler: delete{{ modelCap }},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Delete an existing {{modelCap}} based on id'
    }
  }
}
  }, {
  path: '/{{model}}/:id',
  method: 'put',
  handler: update{{ modelCap }},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Update an existing {{modelCap}} based on id'
    }
  }
}
  }]`;

