
function miniMaxSum(arr) {
    let min_val = arr.sort().slice(0,4).reduce((a, b) => a + b, 0);
let max_val = arr.sort().slice(1,5).reduce((a, b) => a + b, 0);
console.log(min_val, max_val)}

miniMaxSum([3,5,1,9,8]);



function timeConversion(s) {
    if(s.includes("PM")){
        if(s=="12:00:00PM"){
            var converted_time = "00:00:00"

        } else {
            let time_array = s.split(":");
            let hours = parseInt(time_array[0], 10);
            let format24 = hours + 12;
            var converted_time = format24 + ":" + time_array[1] + ":" + time_array[2].slice(0, 2);

        }
    } else{
        var converted_time = s.slice(0,s.length-2);

    }
    console.log(converted_time);
    return converted_time
}

console.log(timeConversion("01:05:03PM"));