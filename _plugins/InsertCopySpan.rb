Jekyll::Hooks.register :documents, :post_render do |doc|
  if doc.output_ext == ".html"
    doc.output.gsub!('<div class="highlight">', '<div class="highlight"><span class="copy-button">content_copy</span>')
    doc.output.gsub!('<figure class="highlight">', '<figure class="highlight"><span class="copy-button">content_copy</span>')
  end
end
