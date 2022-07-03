const mockResponse = {
  data: {
    location: {
      name: "London",
    },
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
