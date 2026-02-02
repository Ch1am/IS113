const records = [
            "8001|Alice Tan|IS|85",
            "8002|Bob Lim|CS|72",
            "8003|Charlie Ng|SE|90",
            "8004|Diana Lee|CS|88",
            "8005|Ethan Ong|IS|85",
            "8006|Ferdian Lee|IS|86"
        ];

function run() {
    let total = 0
    let parta = document.getElementById("parta")
    let partb = document.getElementById("partb")
    let partc = document.getElementById("partc")
    let totalEle = document.getElementById("total")

    let expected_output1 = [
        { studentId: '8001', fullName: 'Alice Tan', programme: 'IS', score: 85 },
        { studentId: '8002', fullName: 'Bob Lim', programme: 'CS', score: 72 },
        { studentId: '8003', fullName: 'Charlie Ng', programme: 'SE', score: 90 },
        { studentId: '8004', fullName: 'Diana Lee', programme: 'CS', score: 88 },
        { studentId: '8005', fullName: 'Ethan Ong', programme: 'IS', score: 85 },
        { studentId: '8006', fullName: 'Ferdian Lee', programme: 'IS', score: 86 }
    ]

    let expected_output3 = {
        IS: { count: 3, average: 85.33 },
        CS: { count: 2, average: 80.00 },
        SE: { count: 1, average: 90.00}
    }

    let students = parseRecords(records)
    console.log(students)

    let i = 0
    let pass = true
    try {
        for (let student of students) {
            let expected = expected_output1[i]
            i++
            if ( expected.fullName == student.fullName && expected.score === student.score) {
                continue
            } else {
                pass = false
                break
            } 
        }
        if (pass) {
            parta.innerText = "PartA passed!"
            total++
        } else {
            parta.innerText = "PartA failed!"
        }
    } catch(error) {
        parta.innerText = "PartA failed!"
    }

    pass = true
    try {
        let numHighScorers = countHighScorers(students, "IS", 85) // returns 3
        if (numHighScorers != 3) 
            pass = false

        numHighScorers = countHighScorers(students, "SE", 85) // returns 1
        if (numHighScorers != 1) 
            pass = false

        numHighScorers = countHighScorers(students, "CS", 85) // returns 1
        if (numHighScorers != 1) 
            pass = false
        
        if (pass) {
            partb.innerText = "PartB passed!"
            total++
        } else {
            partb.innerText = "PartB failed!"
        }
    } catch(error) {
        partb.innerText = "PartB failed!"
    }
    
    try {
        let stats = programmeStats(students)
        console.log(stats)
        console.log(expected_output3)
        pass = true
        for(let programme in expected_output3) {
            let stat = stats[programme]
            let expected_stat = expected_output3[programme]

            if (stat.count !== expected_stat.count || stat.average !== expected_stat.average ) {
                pass = false 
                break
            }
        }
        if (pass) {
            partc.innerText = "PartC passed!"
            total++
        } else {
            partc.innerText = "PartC failed!"
        }
    } catch(error) {
        partc.innerText = "PartC failed!"
    }
    
    totalEle.innerText = `total score: ${total}`
}