# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create_table "free_lance_documents", force: :cascade do |t|
#   t.string "title"
#   t.string "description"
#   t.text "file_url"
#   t.text "image_url"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end

10.times do |d|
	FreeLanceDocument.create!(
		title: "Document #{d}",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
		file_url: "https://drive.google.com/open?id=0B72pYSkZQA2DbVVnSURBMUhwTzg",
		image_url: "http://www.qygjxz.com/data/out/114/5841762-image.jpg"
	)
end
