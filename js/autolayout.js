
function buildGame(game, height = 'height: 450px;', cls = 'm3')
{
    var colImg = (fileName) => {
        return `<div class="w3-col ${cls}">
        <img src="${fileName}" style="width:100%;${height}object-fit: cover;" onclick="onClick(this)" class="w3-hover-opacity" >
      </div>`;
    }

    var colVid = (fileName) => {
        return `<div class="w3-col ${cls}">
        <video class="w3-hover-opacity" autoplay muted loop style="width:100%;${height}object-fit: cover;" onclick="onClick(this)" ><source src="${fileName}" type="video/mp4"></video>
      </div>`;
    }

    var col = (fileName) => {
        var extension = fileName.split('.').pop();
        return extension != 'mp4' ? colImg(fileName) : colVid(fileName);
    }
    
    var sum = (fileNames) => {
        var html = "";
        fileNames.forEach(fileName => {
            html += col(fileName) + "\n";
        });
        return html;
    }

    var row = (fileNames) => {
        return `<div class="w3-row-padding w3-center w3-section">
            ${sum(fileNames)}
        </div>`
    }

    var rowByLandscape = (fileNames, landscape) => {
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

    return `
    <!-- ${game.title} -->
    <p class="w3-center">
      <b>${game.title}</b><br/><em>${game.description}</em>
    </p>
    ${rowByLandscape(game.screenshots, game.landscape)}`;
}

window.addEventListener('DOMContentLoaded', event => {
    
    $( "#github" ).text(portfolio.github);

    portfolio.description.forEach(desc => {
        $( "#about" ).append(`<p>${desc}</p>`);
    });

    $( "#email2" ).text(portfolio.contact.email);
    $( "#email3" ).attr('href', `mailto: ${portfolio.contact.email}`);
    
    $( "#address" ).text(portfolio.contact.address);
    $( "#phone" ).text(portfolio.contact.phone);

    $( "#links" ).append(portfolio.contact.links.map(link => `<a href="${link.url}"><i class="fa ${link.icon} w3-hover-opacity"></i></a>`).join('\n') )

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
});