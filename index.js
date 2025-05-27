
  //      function toggleMenu() {
            //document.getElementById("menu").classList.toggle("open");
      //  }
        
        
        function redirectToPage() {
            window.location.href = "soon.html"; // Change to your target page
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

 
 
 <!-- scroll 📜-->
 let scrollTopBtn = document.getElementById("scrollTopBtn");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) { // Show after scrolling down 300px
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        
        <!-- ⏱️⏱️ -->
        function updateDateTime() {
            let now = new Date();
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let formattedDate = now.toLocaleDateString('en-US', options);
            let formattedTime = now.toLocaleTimeString();

            document.getElementById('realTime').innerHTML = `${formattedDate} | ${formattedTime}`;
        }

        setInterval(updateDateTime, 1000);
        updateDateTime();
        
        
 <!-- yt channel toggle 📜📜⚛️-->
 function toggleContenti() {
            let content = document.getElementById("hiddenContenti");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
        
        
        <!-- header clicking-->
        document.getElementById("headerClick").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirects to the homepage
});

    /* share ↩️ */
    function shareWebsite() {
            const websiteUrl = window.location.href; // Get current website URL
            const shareText = "Check out this amazing website: ";

            if (navigator.share) {
                // If Web Share API is supported
                navigator.share({
                    title: document.title,
                    text: shareText,
                    url: websiteUrl
                }).then(() => {
                    console.log("Website shared successfully!");
                }).catch((error) => {
                    console.error("Error sharing:", error);
                });
            } else {
                // Fallback: Copy link to clipboard
                navigator.clipboard.writeText(websiteUrl).then(() => {
                    alert("Link copied to clipboard! You can paste it anywhere.");
                }).catch(err => {
                    console.error("Failed to copy:", err);
                });
            }
        }
        
        
        
        /* 🤕🤕🤕 */
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





// footer-year.js
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

