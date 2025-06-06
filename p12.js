function toggleChapter(chapterId) {
    let chapter = document.getElementById(chapterId);
    if (chapter.style.display === "none" || chapter.style.display === "") {
        chapter.style.display = "block";
    } else {
        chapter.style.display = "none";
    }
}





function toggleMenu() {
            document.getElementById("menu").classList.toggle("open");
        }
        
        
        function redirectToPage() {
            window.location.href = "p.html"; // Change to your target page
        }
        
        
   
   
   <!--  -->
   
   
        
        
        
        <!--  -->
        
        
        function toggleInfo() {
            var content = document.getElementById("info");
            if (content.style.display === "block") {
                content.style.display = "none"; // Hide content
            } else {
                content.style.display = "block"; // Show content
            }
        }
        
        
        function toggleChapter(chapterId) {
    let chapter = document.getElementById(chapterId);
    if (chapter.style.display === "none" || chapter.style.display === "") {
        chapter.style.display = "block";
    } else {
        chapter.style.display = "none";
    }
}





function toggleSubjects() {
    var menu = document.getElementById("subjectsMenu");
    menu.classList.toggle("show");
}



/*  */
function toggleExtra(extraId) {
    let extra = document.getElementById(extraId);
    if (extra.style.display === "none" || extra.style.display === "") {
        extra.style.display = "block";
    } else {
        extra.style.display = "none";
    }
}


       
 <!-- yt channel toggle 📜📜⚛️-->
 function toggleContenti() {
            let content = document.getElementById("hiddenContenti");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }


/* header clicking*/
document.getElementById("headerClick").addEventListener("click", function (event) {
    event.preventDefault(); // noo Redirects to the homepage
});


/* menu in header 🤕*/
 function toggleMenuk() {
            let sidebark = document.getElementById("sidebark");
            let menuIconk = document.getElementById("menu-iconk");

            sidebark.classList.toggle("openk");

            // Change icon based on menu state
            if (sidebark.classList.contains("openk")) {
                menuIconk.innerHTML = "✖"; // Close icon
            } else {
                menuIconk.innerHTML = "☰"; // Menu icon
            }
        }

        function toggleSubmenuk() {
            document.getElementById("submenuk").classList.toggle("showk");
        }



document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});


