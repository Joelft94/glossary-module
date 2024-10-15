(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.glossaryTooltip = {
      attach: function (context, settings) {
        if (settings.glossaryTooltip && settings.glossaryTooltip.terms) {
          const terms = settings.glossaryTooltip.terms;
          const content = $('body', context).once('glossary-tooltip');
          
          content.each(function () {
            let html = $(this).html();
            Object.keys(terms).forEach(function (term) {
              const regex = new RegExp('\\b' + term + '\\b', 'gi');
              html = html.replace(regex, function (match) {
                return '<span class="glossary-term" data-term="' + term + '">' + match + '</span>';
              });
            });
            $(this).html(html);
          });
          
          $('.glossary-term', context).once('glossary-tooltip').each(function () {
            const term = $(this).data('term');
            if (terms[term] && terms[term].description) {
              const description = terms[term].description;
              let tooltipContent = '<span class="tooltip">' + description;
              if (terms[term].has_more) {
                tooltipContent += ' <a href="' + terms[term].url + '" class="read-more">Read more</a>';
              }
              tooltipContent += '</span>';
              $(this).append(tooltipContent);
            }
          });
  
          // Handle click on the glossary term
          $('.glossary-term', context).on('click', function(e) {
            e.stopPropagation();
            $(this).find('.tooltip').toggleClass('active');
          });
  
          // Handle click on the "Read more" link
          $('.glossary-term .read-more', context).on('click', function(e) {
            e.stopPropagation();
          });
  
          // Close tooltip when clicking outside
          $(document).on('click', function(e) {
            if (!$(e.target).closest('.glossary-term').length) {
              $('.tooltip').removeClass('active');
            }
          });
        }
      }
    };
  })(jQuery, Drupal, drupalSettings);