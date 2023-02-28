import { useState } from 'react';

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'My new website', body: 'lorem10', author: 'mario', id: 1},
        {title: 'Welcome party', body: 'lorem20', author: 'yoshi', id: 2},
        {title: 'web dev top tips', body: 'lorem30', author: 'mario', id: 3}
    ]);
    
    return (
        <div className="home">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{ blog.title }</h2>
                    <p>{ blog.author }</p>
                </div>
            ))}
        </div>
    );
}
 
export default Home;