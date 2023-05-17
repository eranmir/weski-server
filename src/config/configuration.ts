export default () => ({
  port: process.env.PORT || 3000,
  hotels_api: {
    url: 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator',
  },
  max_group_size: 10,
});
