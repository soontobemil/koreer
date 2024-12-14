module.exports = ({ env }) => {
  console.log('env : ', env);
  console.log('process.env.REACT_APP_MODE : ', process.env.REACT_APP_MODE);

  return {
    plugins: [
    ],
    webpack: {
      configure: {
        output: {
        }
      }
    }
  };
}