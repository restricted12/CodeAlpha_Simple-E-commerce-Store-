# create an empty list to store the input contact
contact_book = []
# ask user how many contacts do want to save in their contact book
ask = int(input("HOW MANY CONTACTS DO YOU WANT TO SAVE IN YOUR NOTE BOOK: "))
for i in range(ask):
    print(f"\nEntering contact {i + 1} :")
    contact = {
        "name :- ".upper(): input("Enter first name: "),
        "phone_number  :- ".upper(): int(input("Enter phone number: "))
    }
    contact_book.append(contact)
# display the inputed contacts
print("\nContact Book:")    
for contact in contact_book:
    # for x,y in contact.items():
        print(contact)
# Search for a contact by name
# ask the user to Enter the name you want to search
search = input("\nEnter the name you want to search for: ")
for contact in contact_book:
    # in this the use of (.casefold) to do the words case insensetive.
    if search.casefold() == contact["name"].casefold():  
        print(f" name: {contact['name']}, Phone Number: {contact['phone_number']}")
        break
else:    
    print("Contact not found.")