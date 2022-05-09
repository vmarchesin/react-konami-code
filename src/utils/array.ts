function equals(arr1: number[] | undefined, arr2: number[] | undefined): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}

export default { equals };
