import { useEffect, useState } from 'react';
import { getTags } from '../api/books';
import { Tags } from '../api/types';

const useTags = () => {
    const [tags, setTags] = useState<Tags>();

    useEffect(() => {
        async function fetchTags() {
            setTags(await getTags());
        }

        fetchTags();
    }, []);

    return tags?.tags;
};

export default useTags;
