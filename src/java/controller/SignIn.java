/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author CMOS
 */
@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject user = gson.fromJson(request.getReader(), JsonObject.class);
        String email = user.get("email").getAsString();
        String password = user.get("password").getAsString();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (email.isEmpty()) {
            responseObject.addProperty("message", "Please enter your email!");
        } else if (password.isEmpty()) {
            responseObject.addProperty("message", "Please enter your password!");
        } else {

            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
            
            Criteria c1 = s.createCriteria(User.class);
            
            Criterion crt1 = Restrictions.eq("email", email);
            Criterion crt2 = Restrictions.eq("password", password);

            c1.add(crt1);
            c1.add(crt2);

            if (c1.list().isEmpty()) {
                responseObject.addProperty("message", "Email not found!");
            } else {
                User u=(User)c1.list().get(0);
                HttpSession ses = request.getSession();
                responseObject.addProperty("status", true);

                if (!u.getVerification().equals("Verified")) {
                    ses.setAttribute("email", email);

                    responseObject.addProperty("message", "1");
                } else {
                    ses.setAttribute("user", u);
                    responseObject.addProperty("message", "2");
                }

            }
            s.close();

        }
        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JsonObject responseObject = new JsonObject();

        if (request.getSession().getAttribute("user") != null) {
            responseObject.addProperty("message", "1");
        } else {
            responseObject.addProperty("message", "2");
        }

        Gson gson = new Gson();
        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);
    }

}
