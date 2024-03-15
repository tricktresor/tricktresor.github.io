jQuery(document).ready(function($)
{
    $("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $("#opd-list-holder ul li").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
    });

    
        //UpvoteCount
    $(".upvote-btn").on("click", function(event){
        
        event.preventDefault();
        

        var data_id = $(this).attr("data-post-id");
        var data_title = $(this).attr("data-item-title");
        var data_link = $(this).attr("data-item-link");

        var parentLI = $(this).closest('li').attr("id");

        var selectorBody = $('.qc-grid-item span[data-post-id="'+data_id+'"][data-item-title="'+data_title+'"][data-item-link="'+data_link+'"]');

        var selectorWidget = $('.widget span[data-post-id="'+data_id+'"][data-item-title="'+data_title+'"][data-item-link="'+data_link+'"]');

        var bodyLiId = $(".qc-grid-item").find(selectorBody).closest('li').attr("id");
        var WidgetLiId = $(selectorWidget).closest('li').attr("id");

        //alert( bodyLiId );

        $.post(ajaxurl, {            
            action: 'qcopd_upvote_action', 
            post_id: data_id,
            meta_title: data_title,
            meta_link: data_link,
            li_id: parentLI,
            security: qc_sld_get_ajax_nonce
                
        }, function(data) {
            // console.log(data);
            var json = $.parseJSON(data);
            
            //console.log(json.cookies);
            //console.log(json.exists);
            if( json.vote_status == 'success' )
            {
                $('#'+parentLI+' .upvote-section .upvote-count').html(json.votes);
                $('#'+parentLI+' .upvote-section .upvote-btn').css("color", "green");
                $('#'+parentLI+' .upvote-section .upvote-count').css("color", "green");

                $('#'+bodyLiId+' .upvote-section .upvote-count').html(json.votes);
                $('#'+bodyLiId+' .upvote-section .upvote-btn').css("color", "green");
                $('#'+bodyLiId+' .upvote-section .upvote-count').css("color", "green");

                $('#'+WidgetLiId+' .upvote-section .upvote-count').html(json.votes);
                $('#'+WidgetLiId+' .upvote-section .upvote-btn').css("color", "green");
                $('#'+WidgetLiId+' .upvote-section .upvote-count').css("color", "green");
            }
        });
       
    });
    
    
    
    
});


