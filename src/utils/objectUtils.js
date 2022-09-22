
const addObjectPath = (obj, is, value) => {
  return is.length > 1 ? addObjectPath(obj.hasOwnProperty(is[0]) ? obj[is[0]] : (is.length===1 ? obj[is[0]]=value : obj[is[0]]={}), is.slice(1), value) : obj[is]=value;
}

export const addValueToObject = (obj, is, value) => { 
  return addObjectPath(obj,is.split('.'), value);
}

const multiPath = (obj, is) => {
  if(is.length) return multiPath(obj[is[0]],is.slice(1));
  return obj;
}

export const getPathReference = (obj, is) => { 
  try {
    return multiPath(obj, is.split('.'));
  } catch (e) {
    return '';
  }
}

export const getPathValue = (obj, is) => {
  try {
    const ref = multiPath(obj, is.split('.'));

    if(Array.isArray(ref)) return [...ref];
    if(typeof ref === 'object') return {...ref};

    return ref;
  } catch (e) {
    return '';
  }
}