import { hashCompare, hashPassword } from '@/app/lib/hashPass';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'

const admin = [
  { id: 1, name: "Anderson", languages:["English"], phone:"+1 604-600-9173", email:"Anderson@test.com", password:"$2b$10$MlxmvLIWEV.OqQnDt0yK7uAMmZG9D/34XytFsVKPWbhsAzbEuyv.i" }, //initial Password "email1@123"
  { id: 2, name: "Andressa", languages:["English"], phone:"+1 778-680-5613", email:"Andressa@test.com", password:"$2b$10$fUWS0UM3zneRpbOxgG3ek.1xS.l1wT.7czsox4yR0qrmPA0L04p2i" }, //initial Password "email2@234"
  { id: 3, name: "admin1", languages:["English"], phone:"12345", email:"email1@123", password:"$2b$10$kYS3MFkjoY2j8RabUxTsoeqMdRqStJbzt14Pm1JoKoUoi0vdmQ2y6" }, //initial Password "email1@123"
  { id: 4, name: "admin2", languages:["English"], phone:"12345", email:"email2@234", password:"$2b$10$5IlHpfAT8rNmoF/EqyMCKuh81OO9i0Pa6TbSpyUpLPM7Yk02FM29O" }, //initial Password "email2@234"
];

export const authOptions: NextAuthOptions = {
  session:{
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  providers:[
    CredentialsProvider({
      name:'Email',
      credentials:{
        email:{
          label:"Email",
          type: "email",
          placeholder:"yourEmail@example.com"
        },
        password:{
          label:"Password",
          type:"passwod"
        }
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials.password){
          return null;
        }

        //from database
        const user = admin.find((data)=>{
          return data.email === credentials.email
        })
/* 
        const user = await prisma.instructor.findUnique({
          where: {
            email: credentials.email
          }
        })
 */
        console.log("CREDE",user)

        if(!user){
          return null
        }

        const hashedPassword = await hashPassword("Andressa@test.com")
        console.log("Andressa@test.com",hashedPassword)

        const isPasswordValid =  await hashCompare(credentials.password,user.password)
        console.log("Password",isPasswordValid)

        if (!isPasswordValid){
          return null
        }

        return {
          id:user.id + "",
          email:user.email,
          name:user.name,
        }
      }
    })
  ],

  pages: {
    signIn: "/auth"
  }

}
