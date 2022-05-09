
function buildGame(game, height = 'height: 450px;', cls = 'm3')
{
    const colImg = (fileName) => {
        return `<div class="w3-col ${cls}">
            <img src="${fileName}" onclick="onClick(this)" class="w3-grayscale w3-hover-opacity" >
        </div>`;
    }

    const colVid = (fileName) => {
        return `<div class="w3-col ${cls}">
            <video class="w3-grayscale w3-hover-opacity" autoplay muted loop onclick="onClickVid(this)" ><source src="${fileName}" type="video/mp4"></video>
        </div>`;
    }

    const col = (fileName) => {
        var extension = fileName.split('.').pop();
        return extension != 'mp4' ? colImg(fileName) : colVid(fileName);
    }
    
    const sum = (fileNames) => {
        var html = "";
        fileNames.forEach(fileName => {
            html += col(fileName) + "\n";
        });
        return html;
    }

    const row = (fileNames) => {
        return `<div class="w3-row-padding w3-center w3-section">
            ${sum(fileNames)}
        </div>`
    }

    const rowByLandscape = (fileNames, landscape) => {
        var html = "";
        if (landscape && fileNames.length > 2)
        {
            cls = 'm6';
            var cnt = fileNames.length / 2;

            for (var i = 0; i < cnt; i++)
            {
                var arr = [];
                for (var j = 0; j < 2; j++)
                {
                    arr.push(fileNames[i * 2 + j]);
                }
                html += row(arr) + '\n';
            }
        }
        else
        {
            html = row(fileNames);
        }
        return html
    }

    const platformKeyToTitle = {
        'android': "Link to Google Play",
        'ios': "Link to Apple Store",
        'steam': "Link to Steam",
    }

    const buildLinks = (urls) => {        
        var str = "";
        if (urls != null)
        {
            var keys = Object.keys(urls);
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                const value = urls[key];
                str += `<a href="${value}" target="blank">${platformKeyToTitle[key]}</a>`;
            }
        }
        return str;
    }

    return `
        <!-- ${game.title} -->
        <p class="w3-center">
        <b>${game.title}</b><br/>${buildLinks(game.urls)}<br/><em>${game.description}</em>
        </p>
        ${rowByLandscape(game.screenshots, game.landscape)}`;
}

function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

function onClickVid(originalVideo) {
    var originalSource = originalVideo.children[0];        
    var src = originalSource.src;

    var destinationVideo = document.getElementById("vid02");
    var destinationSource = destinationVideo.children[0];

    destinationSource.setAttribute('src', src);

    var modal = document.getElementById("modal02");
    modal.style.display = "block";

    var captionText = document.getElementById("caption");
    captionText.innerHTML = originalVideo.alt;

    destinationVideo.load();
    destinationVideo.play();
}

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// EVENTS

window.onscroll = function () { myFunction() };
  
window.addEventListener('DOMContentLoaded', event => {
    
    // TITLE
    $( "#github" ).text(portfolio.github);

    // ABOUT
    portfolio.description.forEach(desc => {
        $( "#about" ).append(`<p>${desc}</p>`);
    });

    // CONTACTS
    $( "#email2" ).text(portfolio.contact.email);
    $( "#email3" ).attr('href', `mailto: ${portfolio.contact.email}`);    
    $( "#address" ).text(portfolio.contact.address);    
    $( "#phone" ).text(portfolio.contact.phone);

    // LINKS
    $( "#links" ).append(portfolio.contact.links.map(link => `<a href="${link.url}"><i class="fa ${link.icon} w3-hover-opacity"></i></a>`).join('\n') )

    // GAMES
    var portfolios = $( "#portfolios" );
    portfolios.empty();    
    var keys = Object.keys(portfolio.games);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const game = portfolio.games[key];
        const height = game.landscape ? 'height: 270px;' : (game.screenshots.length == 2 ? 'height: 950px;' : (game.screenshots.length == 3 ? 'height: 650px;' : 'height: 450px;'));
        const cls = game.screenshots.length == 2 ? 'm6' : (game.screenshots.length == 3 ? 'm4' : 'm3');

        portfolios.append(buildGame(game, height, cls));
    }

    // SKILLS
    var skills = $( "#skills" );
    skills.empty();
    portfolio.skills.forEach(skill => skills.append (
        `<p class="w3-wide">
            ${skill.name}
        </p>
        <div class="w3-light-grey">
            <div class="w3-container w3-padding-small w3-dark-grey w3-center" style="width:${skill.value}%">
                ${skill.value}%
            </div>
        </div>`)
    );
});