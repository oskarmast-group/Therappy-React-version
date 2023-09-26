import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import { useMemo } from 'react';

const useConversations = () => {
    const dispatch = useDispatch();
    const dispatcher = useMemo(()=>new Dispatcher(dispatch), [dispatch]);
    const data = useSelector(selector, shallowEqual)

    return [data, dispatcher];
}


export default useConversations;