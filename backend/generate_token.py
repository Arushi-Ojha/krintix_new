import os
from google_auth_oauthlib.flow import InstalledAppFlow

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.events']

def main():
    creds = None
    
    print("Starting authentication flow...")
    print("This will open a browser window. Please log in with the Google Account you want to host the meetings.")
    
    try:
        flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
            
        print("\n✅ Authentication successful!")
        print("✅ The 'token.json' file has been generated.")
        print("You can now book meetings via the API, and real Google Meet links will be generated.")
    except Exception as e:
        print(f"\n❌ Error during authentication: {e}")
        print("Please make sure 'credentials.json' is in the same directory and valid.")

if __name__ == '__main__':
    main()
