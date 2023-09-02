const handleCategory = async() =>{
    const response = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // console.log(data.data);

    const navContainer = document.getElementById('nav-container');
    const div_nav = document.createElement('div');
    div_nav.innerHTML =`<div class="flex flex-col md:flex-row lg:flex-row justify-between items-center mx-4 md:mx-20 mt-5 mb-4 md:mb-0 lg:mb-0">
    <img src="images/Logo.png" alt="none">

    <button class="bg-gray-300 rounded-md p-2 font-semibold w-28 mb-4 md:mb-0 lg:mb-0">Sort by view</button>

    <button onclick ="handleBlog()" class="bg-red-500 rounded-md text-white p-2 font-semibold w-20">Blog</button>
    
    </div>
    <hr class="border-gray-300 mx-20 mt-5">
    `
    navContainer.appendChild(div_nav);

    // ------------------------------------------------------------
    const tabContainer = document.getElementById('tab-container');
    data.data?.forEach((categories) =>{
        const div =document.createElement('div');
        div.innerHTML = `
        

        <a onclick= "handleLoadVideos('${categories.category_id}')" class="tab bg-gray-300 rounded-md mx-2 md:mx-4 mt-2 md:mt-0 hover:bg-red-500 ">${categories.category}</a>
        
        `
        tabContainer.appendChild(div);

    });


};

const handleLoadVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    // console.log(data.data);
  
    const cardContainer = document.getElementById('card-container');
  
    
    cardContainer.innerHTML = '';
    
    if ( data.data.length > 0) {

        data.data?.forEach((videos) => {

        
      const div = document.createElement('div');
      div.innerHTML = `<div class="card w-80 bg-base-100  shadow-xl h-96 rounded-lg">
                    <figure>
                      <img class="h-48 w-full"
                        src=${videos?.thumbnail}
                        alt="none"
                      />
                    </figure>
                    <div class="card-body">
                      <div class="card-footer flex justify-between">
                        <div class="flex gap-4">
                          <div>
                            <div class="">
                              <img class="w-14 rounded-full h-14"
                                src=${videos.authors[0]?.profile_picture}
                              />
                            </div>
                          </div>
                          <h2 class="card-title">
                              ${videos.title}
                            </h2>
                        </div>
                      </div>
                      <div class="flex gap-4 ml-16 ">
                        <h5>${videos.authors[0]?.profile_name}</h5>
                        ${videos.authors[0].verified ? '<img src="checklist.png" alt="" >' : ''}
                      </div>
                      <h5 class="ml-16">${videos.others?.views} views</h5>
                    </div>
                  </div>  `;
      cardContainer.appendChild(div);
    });
    }
    else{
         
         cardContainer.innerHTML = `<div class="grid  grid-cols-1 col-span-4 items-center justify-center h-full mt-20">
         <figure>
           <img class="mx-auto" src="Icon.png" alt="none">
           <figcaption>
             <p class="text-center font-bold text-3xl mt-4">Oops !! Sorry, There is <br>no content here</p>
           </figcaption>
         </figure>
       </div>
       `;
       
    }
};
  
const handleBlog = () =>{ window.location.href = 'blog.html'

};



handleCategory();
handleLoadVideos(1000);