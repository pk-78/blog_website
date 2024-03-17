//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog");

const homeStartingContent = "Welcome to Priyanshu Kushwaha's Blog! I'm Priyanshu, a 3rd-year engineering student at Rajkiya Engineering College Sonbhadra. Here, I share daily insights into my routine, study tips for excelling academically, and reflections on personal growth. Expect a glimpse into my daily life, from early study sessions to late-night coding, as I navigate the challenges of engineering coursework. I'll share effective study strategies to help you succeed, drawing from my own experiences. Beyond academics, I'm passionate about personal growth and self-improvement, and I'll offer actionable advice and reflections on my journey. Community engagement is vital to me, so join the conversation in the comments and connect with fellow students and growth enthusiasts. Whether you're an engineering student or simply interested in personal development, my blog offers a space to learn, grow, and strive for excellence together. Thanks for joining me on this adventure!";
const aboutContent = "Welcome to Priyanshu Kushwaha's Blog, your hub for engineering insights and personal growth inspiration! I'm Priyanshu Kushwaha, a dedicated 3rd-year engineering student at Rajkiya Engineering College Sonbhadra. Here, I invite you to explore my world—a blend of academic rigor and personal development journey.This blog is a chronicle of my daily life, filled with the challenges and triumphs of navigating the complexities of engineering studies. From early morning lectures to late-night study sessions, I share firsthand experiences and practical tips that have helped me excel academically.But this space is more than just study hacks. It's a reflection of my commitment to personal growth and self-improvement. Through candid reflections and actionable insights, I aim to inspire and empower you to embark on your own journey of growth.Why should you stick around? Whether you're an engineering student seeking study strategies, an aspiring individual hungry for personal development, or simply curious about life at Rajkiya Engineering College Sonbhadra, this blog offers valuable content tailored to your interests.Join our community of learners and growth enthusiasts! Engage with the content, share your thoughts in the comments, and connect with like-minded individuals who are passionate about learning and growth.Thank you for visiting Priyanshu Kushwaha's Blog. Together, let's embark on a journey of discovery, learning, and growth. Here's to unlocking our fullest potential, one blog post at a time!Warm regards,Priyanshu Kushwaha"


const contactContent =" Contact Priyanshu Kushwaha:"



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// let composeItems=[]


const blogSchema ={
  title: String,
  post: String
}

const Blog =mongoose.model("Blog", blogSchema);


app.get("/", function(req,res){
  // res.send("<h1>Home</h1>");
Blog.find().then(function(result){
  
    res.render("home",{homefirstcontent:homeStartingContent,addedcompose:result})
  
}).catch(function(err){
  console.log(err);
});

  

});

app.post("/",function(req,res){

  
  res.redirect("/");

  
  
})


app.get("/about",function(req,res){
  res.render("about",{aboutpage:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactpage:contactContent});
});

app.get("/compose",function(req,res){

  
  



  
  res.render("compose");
});

app.post("/compose",function(req,res){
  
    titleContent=req.body.inputTitle,
    postContent=req.body.inputPost
  
  
  
  console.log(titleContent);
  console.log(postContent);
  // console.log(composeItems[0].titleContent)




  const blog = new Blog({
    title: titleContent,
    post: postContent    
    
  })

  blog.save()
  .then(() => {
      res.redirect("/");
  })
  .catch((err) => {
      // Handle error if needed
  });

    
    
  
  
  res.redirect("/");

})

app.get("/post/:postId",function(req,res){
  // for(let i=0;i<composeItems.length;i++){
  //   if(req.params.postType===composeItems[i].titleContent){
  //     console.log("Matching");
  //   }
    

  //   else{
  //     console.log("Not Matching");

  //   }
    
  
  // }
  
  const requestedPostId = req.params.postId;
  // console.log(requestedPostId);

  
  

  Blog.findOne({_id: requestedPostId})
    .then(blog => {
        res.render("post", {singleTitle: blog.title, singlePost: blog.post });
    })
    .catch(err => {
        console.log(err);
    });
  // Blog._id.forEach(function(element){
  //   let postHeading=_.lowerCase(element.title)
  //   if(postHeading===afterPostHeaading){

  //     res.render("post",{singlePostHeading:element.title,singlePostContent:element.post})
  //   }
  //   else {
  //     console.log("Not Matching");
  //   }
  // });
  
  


  
})


<<<<<<< HEAD
app.listen(process.env.PORT|| 3000, function() {
=======
app.listen(process.env.PORT || 3000, function() {
>>>>>>> 7deb9202f8fbee71e333d5c23303006097c9c9c3
  console.log("Server started on port 3000");
});
