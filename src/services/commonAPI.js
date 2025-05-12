import axios from 'axios';

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqconfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  try {
    const response = await axios(reqconfig);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: error.message },
    };
  }
};

export default commonAPI;
