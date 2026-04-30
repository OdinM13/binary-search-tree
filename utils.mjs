export const mergeSort = (array) => {
  let output = [];

  const mergeArray = (arrayA, arrayB, lengthA, lengthB) => {
    let i = 0;
    let j = 0;
    let arrayC = [];
    while (i < lengthA && j < lengthB) {
      if (arrayA[i] < arrayB[j]) {
        const valueA = arrayA[i];
        arrayC.push(valueA);
        i++;
      } else if (arrayA[i] > arrayB[j]) {
        const valueB = arrayB[j];
        arrayC.push(valueB);
        j++;
      } 
      else {
        // if value A = value B, remove duplicate and add only one
        const valueA = arrayA[i];
        arrayC.push(valueA);
        i++;
        j++;
      }
    }
    for (; i < lengthA; i++) {
      arrayC.push(arrayA[i]);
    }
    for (; j < lengthB; j++) {
      arrayC.push(arrayB[j]);
    }
    return arrayC;
  }

  const recursiveSort = (array) => {
    if (array.length === 1 || array.length === 0) {
      return array;
    } else {
      const indexMid = array.length / 2;
      const arrayLeft = array.slice(0, indexMid);
      const arrayRight = array.slice(indexMid, array.length);
      const sortedArrayLeft = recursiveSort(arrayLeft);
      const sortedArrayRight = recursiveSort(arrayRight);
      const mergedArray = mergeArray(sortedArrayLeft, sortedArrayRight, sortedArrayLeft.length, sortedArrayRight.length); 
      return mergedArray;
    }
  }

  return output = recursiveSort(array);
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

