const getTopFoodApi2 =  (page, latitude, longitude) => (
       fetch("http://192.168.64.2/MealRecommendationApplication-Project/api/topfood2.php?pagenumber="+page,
              {
                  method:"POST",
                  headers: {
                     'Content-Type': 'application/json',
                     Accept: 'application/json'
                  },
                  body: JSON.stringify({latitude,longitude})
              })      
      )
      .then(res => {return res.json()})
      // .catch(error=>{
      //   return "";
      // });

 module.exports = getTopFoodApi2;
      