const { useEffect } = require("react")

module.exports = {
  useSomeFeature: () => {
    useEffect(() => {
      console.log("useSomeFeature called!")
    }, [])
  }
}