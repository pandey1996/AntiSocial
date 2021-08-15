{
    // mthod submit form data
    let createPost=function(){
        let newPostForm=$('#new_post_form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    //console.log(data);
                    let newPost=newPostDOM(data.data.post);
                    $('#posts_container>ul').prepend(newPost);
                    deletePost($(' .delete_post', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post

    let newPostDOM=function(post){
        return $(`
        <li id="post-${post._id}">
            <p>
                ${ post.content }
                <small>
                    ${ post.user.name }
                </small>
                
                <small>
                    <a class="delete_post" href="/posts/destroy/${post._id}">X</a>
                </small>
            </p>
            <div class="comment_class">
                <form action="/comments/create" id="addComment" method="POST">
                    <textarea name="newComment" cols="30" rows="2" placeholder="Comment Here....."></textarea>  
                    <input type="hidden" name="post_id" value="${post._id}">
                    <input type="submit" value="comment">    
                </form>
                <div class="comment_list">
                    <ul id="post-comments-${ post._id }">
                    </ul>
                </div>
            </div>
        </li>
    `);
    }
    //method to delete a post
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}