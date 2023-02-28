import { useState } from 'react';
import BlogList from './bloglist';

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'My new website', body: 'lorem10', author: 'mario', id: 1},
        {title: 'Welcome party', body: 'lorem20', author: 'yoshi', id: 2},
        {title: 'web dev top tips', body: 'lorem30', author: 'mario', id: 3}
    ]);

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }
    
    return (
        <div className="home">
           <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete}/>
        </div>
    );
}
 
export default Home;