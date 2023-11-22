const test = function (a, b, c) {
    for (let i = 0; i < 3; i++) {
        const ele = i
        console.log(ele)
    }
// 	const hi = test2(a, b, c)
//   console.log(a)
//   return [a, hi]
}

const test2 = function (a, b, c) {
	a++
  b++
	return [a, b, c]
}

console.log(test(1, 2, 3))
