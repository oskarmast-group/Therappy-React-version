import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';

const useCategories = () => {
    const dispatcher = new Dispatcher(useDispatch());
    const data = useSelector(selector, shallowEqual)

    return [data, dispatcher];
}


export default useCategories;