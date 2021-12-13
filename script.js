class GridGame
{
    data; data_name;
    constructor(data_name) {
        this.data = localStorage.getItem(data_name);
        this.data_name = data_name;
        if (this.data) {
            this.data = JSON.parse(this.data);
        }
        else {
            this.data = {
                moves: {},
                count: 0,
                winner: null
            };
        }
    }
    getSymbol() {
        return (this.data.count % 2 == 0) ? 'x' : 'o';
    }
    saveMove(coord, value) {
        this.data.moves[coord] = value;
        ++this.data.count;
        localStorage.setItem(this.data_name, JSON.stringify(this.data));      
    }
    hasCoord(coord) {
        return this.data.moves.hasOwnProperty(coord);
    }
    resetGame() {
        this.data = {
            moves: {},
            count: 0,
            winner: null
        };
        localStorage.removeItem(this.data_name);
    }
    setWinner(symbol, coords) {
        this.data.winner = {
            symbol: symbol,
            coords: coords
        };
        localStorage.setItem(this.data_name, JSON.stringify(this.data));
    }
    getWinner() {
        return this.data.winner;
    }
}

const tic_tac_toe = new GridGame('bootcamp11_tic_tac_toe_jqyery_data');

const game_board = $('.game_board');
const buttons = game_board.find('a');

for (const [coord, symbol] of Object.entries(tic_tac_toe.data.moves)) {
    buttons.eq(coord - 1).text(symbol);
}

if (tic_tac_toe.getWinner() !== null) {
    let winner = tic_tac_toe.getWinner();
    $('.message').text(winner.symbol + ' has won!');
    for (let coord of winner.coords) {
        buttons.eq(coord - 1).addClass('success');
    }
}

buttons.on('click', function (event) {
    event.preventDefault();
    let coord = $(this).data('coord');
    
    if (
        !tic_tac_toe.hasCoord(coord) &&
        tic_tac_toe.getWinner() === null
    ) {
        let symbol = tic_tac_toe.getSymbol();
        $(this).text(symbol);
        tic_tac_toe.saveMove(coord, symbol);
        hasWinner: {
            const win_combinations = [
                [1,2,3],
                [4,5,6],
                [7,8,9],

                [1,4,7],
                [2,5,8],
                [3,6,9],

                [1,5,9],
                [3,5,7]
            ];

            for (let win_coords of win_combinations) {
                if (
                    tic_tac_toe.data.moves[win_coords[0]] === symbol &&
                    tic_tac_toe.data.moves[win_coords[1]] === symbol &&
                    tic_tac_toe.data.moves[win_coords[2]] === symbol
                ) {
                    tic_tac_toe.setWinner(symbol, win_coords);
                    
                    $('.message').text(symbol + ' has won!');
                    for (let coord of win_coords) {
                        buttons.eq(coord - 1).addClass('success');
                    }
                    break;
                }
            }
        }
    }
});

$('.reset').on('click', function(event) {
    event.preventDefault();
    tic_tac_toe.resetGame();
    buttons.text('');
    $('.message').text('');
    game_board.find('.success').removeClass('success');
});

/******************************
 * Iezīmējam uzvaras šūnas.    *
 ******************************/

/**
 * 
 * 2. Jautājumi? Kas? Kur? Idejas.
 * 
 * 
 * 3. Uzdevuma sadalīšana apakšuzdevumos.
 * - ✅noteikt šunas kuras ir jāiekrāso
 *  - ✅Uzvaras kobināciju ir jāsaglabā lokālajā atmiņā.
 * ✅- iekrāsot attiecīgās šunas.
 * - pie reset ir jāpazūd uzvaras gājienu iekrāsošana.
 * 
 *  2. Noņemt klasi success
 */
