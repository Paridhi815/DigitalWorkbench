
module.exports = `

const {
  create{{modelCap}}, update{{modelCap}}, delete{{modelCap}}, get{{modelCap}}, get{{modelCap}}s
} = require('../service/{{model}}-service')


module.exports = [{
  path: '/{{model}}/:id',
  method: 'get',
  handler: get{{modelCap}},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Find an existing {{modelCap}} based on id'
    }
  }
}
  },
{
  path: '/{{model}}/',
  method: 'get',
  handler: get{{modelCap}}s,
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Find an existing {{modelCap}} based on id'
    }
  }
}
    },{
  path: '/{{model}}/',
  method: 'post',
  handler: create{{modelCap}},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Creates a new {{modelCap}}'
    }
  }
}
  },{
  path: '/{{model}}/:id',
  method: 'delete',
  handler: delete{{modelCap}},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Delete an existing {{modelCap}} based on id'
    }
  }
}
  },{
  path: '/{{model}}/:id',
  method: 'put',
  handler: update{{modelCap}},
  config: {
  tags: ['{{modelCap}}'],
  responses: {
    200: {
      description: 'Update an existing {{modelCap}} based on id'
    }
  }
}
}]
`;

