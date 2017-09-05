class CreateFreeLanceDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :free_lance_documents do |t|
      t.string :title
      t.string :description
      t.text :file_url
      t.text :image_url

      t.timestamps
    end
  end
end
